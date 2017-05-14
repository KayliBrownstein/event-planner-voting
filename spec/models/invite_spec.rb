require 'rails_helper'

RSpec.describe Invite, type: :model do
  let(:invite) do
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
    Invite.create(
      event_id: 1,
      sender_id: 1,
      email: 'test@aol.com'
    )
  end

  it 'is valid with valid attributes' do
    expect(invite).to be_valid
  end

  it 'is not valid without a sender id' do
    invite.sender_id = nil
    expect(invite).to_not be_valid
  end

  it 'is not valid without an email' do
    invite.email = nil
    expect(invite).to_not be_valid
  end
end
