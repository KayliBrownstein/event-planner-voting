require 'rails_helper'

RSpec.describe LocationVote, type: :model do
  let(:location_vote) do
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
    Location.create(
      id: 1,
      user_id: 1,
      event_id: 1,
      name: 'Picco',
      description: 'Pizza place',
      street_address: '153 Tremont Street',
      city: 'Boston',
      state: 'MA'
    )
    LocationVote.create(
      location_id: 1,
      user_id: 1,
      upvote: true,
      downvote: false
    )
  end

  it 'is valid with valid attributes' do
    expect(location_vote).to be_valid
  end

  it 'is not valid without an associated user' do
    location_vote.user_id = nil
    expect(location_vote).to_not be_valid
  end

  it 'is not valid without an associated location' do
    location_vote.location_id = nil
    expect(location_vote).to_not be_valid
  end
end
