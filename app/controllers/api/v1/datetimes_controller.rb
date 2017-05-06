class Api::V1::DatetimesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @event = Event.find(params[:event_id])
    @datetimes = @event.datetimes
    render json: @datetimes.to_json(:methods => :vote_count)
    @user = current_user
  end

  def show
    @user = current_user
    @datetime = Datetime.find(params[:id])
    @datetime_votes = @datetime.datetime_votes
    render json: @datetime_votes
  end

  def create
    @datetime = Datetime.new(datetime_params)
    @datetime.user_id = current_user.id
    @event = Event.find(params[:event_id])
    @datetime.event = @event
    if @datetime.save!
      render json: @datetime
    end
  end

  def edit
    @datetime = Datetime.find(params[:id])
  end

  def update
    if !current_user.nil? && (datetime_vote_params[:upvote] == true || datetime_vote_params[:upvote] == false)
      @datetime = Datetime.find(params[:id])
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
    datetimes = Event.find(params[:event_id]).datetimes
    datetimes.each do |l|
      l.check_belongs_to_user(current_user)
    end
    render json: @datetime.datetime_votes
  end

  private

  def datetime_params
    params.permit(:id, :user_id, :event_id, :date, :time)
  end

  def datetime_vote_params
    params.require(:datetime_vote).permit(:upvote, :downvote)
  end
end
