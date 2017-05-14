require 'rails_helper'

RSpec.describe Datetime, type: :model do
  let(:datetime) do
    User.create(
      id: 1,
      username: "jarlax3",
      email: "jarlax3@launchacademy.com",
      password: 'password',
      first_name: 'Jar',
      last_name: 'Smith'
    )
    Event.create(
      id: 1,
      user_id: 1,
      name: "Birthday Party",
      description: 'This is a description. This is a description.
        This is a description. This is a description. This is a description. This is a description.',
      cutoff_time: "Monday"
    )
    Datetime.create(
      user_id: 1,
      event_id: 1,
      date: '2017-05-12',
      time: '19:00'
    )
  end

  it 'is valid with valid attributes' do
    expect(datetime).to be_valid
  end

  it 'is not valid without a date' do
    datetime.date = nil
    expect(datetime).to_not be_valid
  end

  it 'is not valid without a time' do
    datetime.time = nil
    expect(datetime).to_not be_valid
  end
end
