export class ItemDto {
  constructor(
    public sku_number: string,
    public category: string,
    public title: string,
    public description: string,
    public unit_price: number,
    public quantity: number,
    public unit_measure: string,
    public total_amount: number,
  ) {}
}

export class CashOutDto {
  constructor(public amount: number) {}
}

export class PurchaseDto {
  constructor(
    public cash_out: CashOutDto,
    public description: string,
    public external_reference: string,
    public items: ItemDto[],
    public notification_url: string,
    public title: string,
    public total_amount: number,
  ) {}
}
