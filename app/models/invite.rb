class Invite < ActiveRecord::Base
  belongs_to :event
  belongs_to :sender, :class_name => 'User'

  validates :email, presence: true
  validates :sender, presence: true
end
