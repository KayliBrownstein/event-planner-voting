class DatetimesController < ApplicationController
  def new
    @event = Event.find(params[:event_id])
    @datetime = Datetime.new
  end

  def create
    @datetime = Datetime.new(datetimes_params)
    @event = Event.find(session[:ugid])
    if @datetime.save
      redirect_to event_path(@event)
    else
      flash[:notice] = @datetime.errors.full_messages.join(", ")
      redirect_to event_path(@event)
    end
  end

  private

  def datetimes_params
    params.require(:datetime).permit(:user_id, :event_id, :date, :time)
  end
end
