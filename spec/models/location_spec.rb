require 'rails_helper'

RSpec.describe Location, type: :model do
  let(:location) do
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
      description: 'This is a description. This is a description. This is a description. This is a description. This is a description. This is a description.',
      cutoff_time: "Monday"
    )
    Location.create(
      user_id: 1,
      event_id: 1,
      name: 'Picco',
      description: 'Pizza place',
      street_address: '153 Tremont Street',
      city: 'Boston',
      state: 'MA'
    )
  end

  it 'is valid with valid attributes' do
    expect(location).to be_valid
  end

  it 'is not valid without a name' do
    location.name = nil
    expect(location).to_not be_valid
  end

  it 'is not valid without a description' do
    location.description = nil
    expect(location).to_not be_valid
  end

  it 'is not valid without a street address' do
    location.street_address = nil
    expect(location).to_not be_valid
  end

  it 'is not valid without a city' do
    location.city = nil
    expect(location).to_not be_valid
  end

  it 'is not valid without a state' do
    location.state = nil
    expect(location).to_not be_valid
  end
end
