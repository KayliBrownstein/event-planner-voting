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
end
