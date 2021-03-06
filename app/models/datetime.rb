class Datetime < ApplicationRecord
  belongs_to :user
  belongs_to :event
  has_many :datetime_votes

  validates :date, presence: true
  validates :time, presence: true
  validates :user, presence: true
  validates :event, presence: true

  before_save :format_time
  before_save :format_date

  def format_time
    unless self.time.nil?
      self.time = time.to_time.strftime("%l:%M %P")
    end
  end

  def format_date
    unless self.date.nil?
      self.date = date.to_date.strftime('%A %B %e, %Y')
    end
  end

  def upvotes
    datetime_votes.where(upvote: true).length
  end

  def downvotes
    datetime_votes.where(downvote: true).length
  end

  def vote_count
    upvotes - downvotes
  end

  def date_formatted
    date.to_date.strftime('%A %B %e, %Y')
  end

  def time_formatted
    time.to_time.strftime("%l:%M %P")
  end

  def did_user_vote?(user)
    if datetime_votes.where(user: user).empty?
      false
    else
      true
    end
  end

  def check_belongs_to_user(current_user)
    if user == current_user
      @current_user = true
    else
      @current_user = false
    end
  end
end
