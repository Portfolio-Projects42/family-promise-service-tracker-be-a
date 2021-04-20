const knex = require('../../data/db-config');

const findAll = async () => {
  return await knex('service_types')
    .leftJoin('services_providers', {
      'service_types.id': 'services_providers.service_type_id',
    })
    .leftJoin('profiles', {
      'services_providers.provider_id': 'profiles.id',
    })
    .select(
      knex.raw('service_types.*, json_agg(profiles.*) as service_providers')
    )
    .groupBy('service_types.id');
};

const findById = async (id) => {
  return await knex('service_types')
    .leftJoin('services_providers', {
      'service_types.id': 'services_providers.service_type_id',
    })
    .leftJoin('profiles', {
      'services_providers.provider_id': 'profiles.id',
    })
    .select(
      knex.raw('service_types.*, json_agg(profiles.*) as service_providers')
    )
    .where({ 'service_types.id': id })
    .groupBy('service_types.id')
    .first();
};

const create = async (serviceType) => {
  // separate out the service_providers array for junction table insert
  const { service_providers, ...newServiceType } = serviceType;
  // declare id variable for access across scopes
  let newServiceTypeId;
  try {
    await knex.transaction(async (trx) => {
      // first insert the serviceType object into service_types
      const createdServiceType = await trx('service_types')
        .insert(newServiceType)
        .returning('*');

      // set the ID of the returning DB record
      console.log(createdServiceType);
      newServiceTypeId = createdServiceType[0].id;

      // if there are service providers that need to be associated
      // with this type, insert them into junction table
      if (service_providers && service_providers.length > 0) {
        await trx('services_providers').insert(
          service_providers.map((p) => {
            return { service_type_id: newServiceTypeId, provider_id: p };
          })
        );
      }
    });
    // return promise with the new service type and associated providers
    return await findById(newServiceTypeId);
  } catch (err) {
    // if transaction fails, forward the error to the router for handling
    throw new Error(err);
  }
};

module.exports = {
  findAll,
  findById,
  create,
};
