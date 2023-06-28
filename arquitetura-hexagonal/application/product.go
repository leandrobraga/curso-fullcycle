package application

type ProductInterface interface {
	IsValid() (bool, error)
	Enable() error
	Disable() error
	GetID() string
	GetName() string
	GetStatus() string
	GetPrice() float64
}

const (
	DISABLED = "disabled"
	ENABLED  = "enabled"
)

type Product struct {
	ID     string
	Name   string
	Status string
	Price  float64
}

func (p *Product) IsValid() (bool, error) {
	return false, nil
}

func (p *Product) Enable() error {
	return nil
}

func (p *Product) Disable() error {
	return nil
}

func (p *Product) GetID() string {
	return ""
}

func (p *Product) GetName() string {
	return ""
}

func (p *Product) GetStatus() string {
	return ""
}

func (p *Product) GetPrice() float64 {
	return 0
}
