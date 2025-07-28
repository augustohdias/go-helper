package services

import (
	"sync"

	"github.com/your-project/internal/application/services"
	"github.com/your-project/internal/domain/usecases"
)

var (
	onceUser     sync.Once
	userInstance usecases.UserUseCase
)

// MakeUser creates a singleton instance of UserService
func MakeUser() usecases.UserUseCase {
	onceUser.Do(func() {
		userInstance = services.NewUser()
	})
	return userInstance
}
