class LocationVote < ApplicationRecord
  belongs_to :location
  belongs_to :user

  validates :user, uniqueness: { scope: :location_id }
end 
