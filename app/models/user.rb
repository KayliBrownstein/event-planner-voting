class User < ApplicationRecord
  EMAIL_REGEXP = /\A[^@\s]+@([^@\s]+\.)+[^@\s]+\z/
  has_many :events
  has_many :userevents
  has_many :datetimes
  has_many :locations

  validates :first_name, presence: true
  validates :last_name, presence: true

  validates_format_of :email, with: EMAIL_REGEXP
  validates_uniqueness_of :email, :universally_unique_id
end
