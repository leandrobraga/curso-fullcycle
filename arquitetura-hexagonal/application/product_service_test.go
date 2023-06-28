package application_test

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/leandrobraga/curso-fullcycle/arquitetura-hexagonal/application"
	mock_application "github.com/leandrobraga/curso-fullcycle/arquitetura-hexagonal/application/mocks"
	"github.com/stretchr/testify/require"
)

// Comando para gerar os mocks
// mockgen -destination=application/mocks/application.go -source=application/product.go application

func TestProductService_Get(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	product := mock_application.NewMockProductInterface(ctrl)
	persistence := mock_application.NewMockProductPersistenceInterface(ctrl)
	persistence.EXPECT().Get(gomock.Any()).Return(product, nil).AnyTimes()

	service := application.ProductService{
		Persistence: persistence,
	}

	result, err := service.Get("abc")
	require.Nil(t, err)
	require.Equal(t, product, result)
}