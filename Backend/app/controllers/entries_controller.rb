class EntriesController < ApplicationController
    before_action :set_company
  before_action :set_company_entry, only: [:show, :update, :destroy]

  # GET /entries
  def index
    render json: @company.entries
  end

  # GET /entries/1
  def show
    render json: @entry
  end

  # POST /entries
  def create
      @company.entries.create!(entry_params)
      render json: @company, status: :created, location: @entry
  end

  # PATCH/PUT /entries/1
  def update
    if @entry.update(entry_params)
      render json: @entry
    else
      render json: @entry.errors, status: :unprocessable_entity
  end
  end

  # DELETE /entries/1
  def destroy
    @entry.destroy
  end

  private

    def set_company
        @company = Company.find(params[:company_id])
    end

    def set_company_entry
        @entry = @company.entries.find_by!(id: params[:id]) if @company
    end

    # Only allow a trusted parameter "white list" through.
    def entry_params
      params.permit(:name, :description, :created_at, :amount, :company_id)
    end
end
