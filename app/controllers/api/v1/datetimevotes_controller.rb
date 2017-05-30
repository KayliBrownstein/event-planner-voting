class Api::V1::DatetimevotesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def update
    @datetime = Datetime.find(params[:id])
    @event = @datetime.event
    if !current_user.nil? && (datetime_vote_params[:upvote] == true || datetime_vote_params[:upvote] == false)
      datetime_votes = @datetime.datetime_votes
        if @datetime.did_user_vote?(current_user)
          vote = datetime_votes.find { |v| v.user == current_user }
          if datetime_vote_params[:upvote] && !vote.upvote && !vote.downvote
            DatetimeVote.update(vote, upvote: true)
          elsif datetime_vote_params[:upvote] && !vote.upvote && vote.downvote
            DatetimeVote.update(vote, downvote: false)
          elsif !datetime_vote_params[:upvote] && !vote.upvote && !vote.downvote
            DatetimeVote.update(vote, downvote: true)
          elsif !datetime_vote_params[:upvote] && vote.upvote && !vote.downvote
            DatetimeVote.update(vote, upvote: false)
          end
        elsif datetime_vote_params[:upvote]
          DatetimeVote.create(
            datetime: @datetime,
            upvote: true,
            user: current_user
          )
        elsif !datetime_vote_params[:upvote]
          DatetimeVote.create(
            datetime: @datetime,
            downvote: true,
            user: current_user
          )
        end
    end
    datetimes = @event.datetimes
    datetimes.each do |l|
      l.check_belongs_to_user(current_user)
    end
    render json: @datetime.vote_count
  end

  private

  def datetime_vote_params
    params.require(:datetime_vote).permit(:upvote, :downvote)
  end
end
