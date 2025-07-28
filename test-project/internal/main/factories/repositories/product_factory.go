package repositories

import (
	"database/sql"
	"sync"

	"github.com/your-project/internal/application/contracts/repositories"
	repoImpl "github.com/your-project/internal/infra/databases/repositories"
)

var (
	onceProduct     sync.Once
	productInstance repositories.ProductRepositoryContract
)

// MakeProduct creates a singleton instance of ProductRepository
func MakeProduct(db *sql.DB) repositories.ProductRepositoryContract {
	onceProduct.Do(func() {
		productInstance = repoImpl.NewProductRepository(db)
	})
	return productInstance
}
