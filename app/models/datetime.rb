class Datetime < ApplicationRecord
  validates :date, presence: true
  validates :time, presence: true
  belongs_to :user
  belongs_to :event
  has_many :datetime_votes

  def upvotes
    datetime_votes.where(upvote: true).length
  end

  def downvotes
    datetime_votes.where(downvote: true).length
  end

  def vote_count
    upvotes - downvotes
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
