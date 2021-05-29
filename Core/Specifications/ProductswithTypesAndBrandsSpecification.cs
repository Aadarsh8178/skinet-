using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
  public class ProductswithTypesAndBrandsSpecification : BaseSpecification<Product>
  {
    public ProductswithTypesAndBrandsSpecification()
    {
      AddInclude(x => x.ProductType);
      AddInclude(x => x.ProductBrand);
    }

    public ProductswithTypesAndBrandsSpecification(int id) : base(x => x.Id == id)
    {
      AddInclude(x => x.ProductType);
      AddInclude(x => x.ProductBrand);
    }
  }
}