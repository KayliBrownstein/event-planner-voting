class DatetimeVote < ApplicationRecord
  belongs_to :datetime
  belongs_to :user

  validates :user, uniqueness: { scope: :datetime_id }
end
