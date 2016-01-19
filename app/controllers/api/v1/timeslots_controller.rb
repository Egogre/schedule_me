class Api::V1::TimeslotsController < ApplicationController
  respond_to :json

  def create
    respond_with :api, :v1, Timeslot.create(timeslot_params)
  end

  def index
    
  end

  private

  def timeslot_params
    params.require(:timeslot).permit(:date, :start_time, :end_time, :user_id, :schedule_id)
  end

end
