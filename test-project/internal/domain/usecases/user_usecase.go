package usecases

import "context"

// UserUseCase defines the contract for user use case
type UserUseCase interface {
	Execute(ctx context.Context) error
	// TODO: Add your use case methods here
}
