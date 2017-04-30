class Event < ApplicationRecord
  has_many :locations
  has_many :datetimes
  has_many :event_members
  belongs_to :user

  validates :name, presence: true
  validates :description, presence: true
  validates :cutoff_time, presence: true
  validates :user_id, presence: true
end
