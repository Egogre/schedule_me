class Schedule < ActiveRecord::Base
  belongs_to :user
  validates :title, :user_id, :start_date, :end_date, presence: true
end
