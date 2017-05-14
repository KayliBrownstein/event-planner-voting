require 'rails_helper'

RSpec.describe DatetimeVote, type: :model do
  let(:datetime_vote) do
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
      id: 1,
      user_id: 1,
      event_id: 1,
      date: '2017-05-12',
      time: '19:00'
    )
    DatetimeVote.create(
      datetime_id: 1,
      user_id: 1,
      upvote: true,
      downvote: false
    )
  end

  it 'is valid with valid attributes' do
    expect(datetime_vote).to be_valid
  end

  it 'is not valid without an associated user' do
    datetime_vote.user_id = nil
    expect(datetime_vote).to_not be_valid
  end

  it 'is not valid without an associated datetime' do
    datetime_vote.datetime_id = nil
    expect(datetime_vote).to_not be_valid
  end
end
