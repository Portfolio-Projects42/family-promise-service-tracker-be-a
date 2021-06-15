const recipients = [
  {
    recipient_id: 'ec6f7c16-d064-4ae3-a759-4fea047f2c76',
    recipient_first_name: 'bob',
    recipient_middle_name: 'tree',
    recipient_last_name: 'ross',
    recipient_date_of_birth: '1970-10-12',
    recipient_veteran_status: false,
    household_id: 'x', //need uuid
    gender_id: 1,
    race_id: 1,
    ethnicity_id: 1,
  },
  {
    recipient_id: '81a40c69-b004-4cc8-b6a5-424cbab89b8d',
    recipient_first_name: 'bob1',
    recipient_middle_name: null,
    recipient_last_name: 'ross1',
    recipient_date_of_birth: '1970-10-12',
    recipient_veteran_status: false,
    household_id: 'x', //need uuid
    gender_id: 1,
    race_id: 1,
    ethnicity_id: 1,
  },
  {
    recipient_id: '1b1639f9-a614-4d15-93d8-1d0b27ca12a6',
    recipient_first_name: 'bob2',
    recipient_middle_name: 'tree2',
    recipient_last_name: 'ross2',
    recipient_date_of_birth: '1970-10-12',
    recipient_veteran_status: false,
    household_id: 'x', //need uuid
    gender_id: 1,
    race_id: 1,
    ethnicity_id: 1,
  },
];

exports.seed = function (knex) {
  return knex('recipients').insert(recipients);
};
