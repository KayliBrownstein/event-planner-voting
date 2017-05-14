class DatetimeVote < ApplicationRecord
  belongs_to :datetime
  belongs_to :user

  validates :user, presence: true, uniqueness: { scope: :datetime_id }
  validates :datetime, presence: true
end
