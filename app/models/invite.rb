class Invite < ActiveRecord::Base
  belongs_to :event
  belongs_to :sender, :class_name => 'User'

  validates :email, presence: true
  validates :sender, presence: true

  before_create :generate_token

  def generate_token
     self.token = Digest::SHA1.hexdigest([self.event_id, Time.now, rand].join)
  end
end
