class Timeslot < ActiveRecord::Base
  belongs_to :schedule
  validates :date, :start_time, :end_time, :schedule_id, presence: true
end
