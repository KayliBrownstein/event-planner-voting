class Event < ApplicationRecord
  has_many :locations
  has_many :datetimes
  has_many :userevents

  validates :name, presence: true
  validates :description, presence: true
  validates :cutoff_time, presence: true
  validates :user_id, presence: true
  belongs_to :user
end
