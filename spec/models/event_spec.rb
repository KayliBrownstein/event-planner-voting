require 'rails_helper'

RSpec.describe Event, type: :model do
  let(:event) do
    User.create(
      id: 1,
      username: "jarlax3",
      email: "jarlax3@launchacademy.com",
      password: 'password',
      first_name: 'Jar',
      last_name: 'Smith'
    )
    Event.create(
      user_id: 1,
      name: "Birthday Party",
      description: 'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description.',
      cutoff_time: "Monday"
    )
  end

  it 'is valid with valid attributes' do
    expect(event).to be_valid
  end

  it 'is not valid without an associated user' do
    event.user_id = nil
    expect(event).to_not be_valid
  end

  it 'is not valid without a name' do
    event.name = nil
    expect(event).to_not be_valid
  end

  it 'is not valid without a description' do
    event.description = nil
    expect(event).to_not be_valid
  end

  it 'is not valid without a cutoff time' do
    event.cutoff_time = nil
    expect(event).to_not be_valid
  end
end
