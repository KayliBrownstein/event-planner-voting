class Event < ApplicationRecord
  has_many :locations
  has_many :invites
  has_many :datetimes
  has_many :event_members
  has_many :users, through: :event_members

  validates :name, presence: true
  validates :description, presence: true
  validates :cutoff_time, presence: true
  validates :user_id, presence: true

  def winning_location
    winner = locations.first
    max_vote = 0
    locations.each do |location|
      if location.vote_count > max_vote
        winner = location
        max_vote = location.vote_count
      end
    end
    return winner
  end

  def winning_datetime
    winner = datetimes.first
    max_vote = 0
    datetimes.each do |datetime|
      if datetime.vote_count > max_vote
        winner = datetime
        max_vote = datetime.vote_count
      end
    end
    return winner
  end
end
