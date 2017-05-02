class Location < ApplicationRecord
  validates :name, presence: true
  validates :street_address, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :description, presence: true

  belongs_to :user
  belongs_to :event
end
