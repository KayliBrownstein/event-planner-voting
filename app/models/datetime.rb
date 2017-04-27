class Datetime < ApplicationRecord
  validates :date, presence: true
  validates :time, presence: true
  belongs_to :user
  belongs_to :event
end
