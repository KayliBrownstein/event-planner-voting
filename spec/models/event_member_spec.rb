require 'rails_helper'

RSpec.describe EventMember, type: :model do
  let(:event_member) do
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
      description: 'This is a description. This is a description. This is a
      description. This is a description. This is a description. This is a
      description.',
      cutoff_time: "Monday",
      suggested_date: 'Tuesday',
      suggested_time: '7:00PM',
      suggested_location: 'Regina\'s'
    )
    EventMember.create(
      user_id: 1,
      event_id: 1
    )
  end

  it 'is not valid without an event id' do
    event_member.event_id = nil
    expect(event_member).to_not be_valid
  end

  it 'is not valid without a user id' do
    event_member.user_id = nil
    expect(event_member).to_not be_valid
  end
end
