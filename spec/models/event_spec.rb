require 'rails_helper'

RSpec.describe Event, type: :model do
  let(:event) do
    User.create(
      id: 1,
      first_name: "John",
      last_name: "Smith",
      username: 'smith',
      email: "jsmith@launchacademy.com",
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

  it 'is not valid without an associated id' do
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
