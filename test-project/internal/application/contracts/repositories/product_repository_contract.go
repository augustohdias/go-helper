package repositories

import "context"

// ProductRepositoryContract defines the contract for product repository
type ProductRepositoryContract interface {
	Create(ctx context.Context, entity interface{}) error
	FindByID(ctx context.Context, id string) (interface{}, error)
	Update(ctx context.Context, entity interface{}) error
	Delete(ctx context.Context, id string) error
	// TODO: Add your repository methods here
}
