class Api::V1::DatetimesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @user = current_user
    @event = Event.find(params[:event_id])
    @datetimes = @event.datetimes.order(:date, :time)
    render json: @datetimes.to_json(:methods => [:vote_count, :date_formatted, :time_formatted])
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
    @datetime.date = datetime_params[:date].to_date.strftime('%A %B %e, %Y')
    @datetime.time = datetime_params[:time].to_time.strftime("%l:%M %P")
    if @datetime.save!
      render json: @datetime
    end
  end

  def edit
    @datetime = Datetime.find(params[:id])
  end

  private

  def datetime_params
    params.permit(:id, :user_id, :event_id, :date, :time)
  end
end
