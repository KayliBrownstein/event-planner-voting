class EventMember < ApplicationRecord
  belongs_to :user
  belongs_to :event
  has_many :invites
end
