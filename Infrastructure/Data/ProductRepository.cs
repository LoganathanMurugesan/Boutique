using System.Collections.Generic;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data
{
    public class ProductRepository : IProductRepository
    {
        private readonly StoreContext _storeContext;
        public ProductRepository(StoreContext storeContext)
        {
            _storeContext = storeContext;
        }

        public async Task<IReadOnlyList<ProductBrand>> GetProductBrandsAsync()
        {
            var productBrands = await _storeContext.ProductBrands.ToListAsync();
            return productBrands;
        }

        public async Task<Product> GetProductByIdAsync(int id)
        {
            var product = await _storeContext.Products
                                                .Include(p => p.ProductBrand)
                                                .Include(p => p.ProductType)
                                                .FirstOrDefaultAsync(p => p.Id == id);
            return product;
        }

        public async Task<IReadOnlyList<Product>> GetProductsAsync()
        {
            var products = await _storeContext.Products
                                                .Include(p => p.ProductBrand)
                                                .Include(p => p.ProductType)
                                                .ToListAsync();
            return products;
        }

        public async Task<IReadOnlyList<ProductType>> GetProductTypesAsync()
        {
              var productTypes = await _storeContext.ProductTypes.ToListAsync();
            return productTypes;
        }
    }
}