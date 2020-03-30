import OrderImpl from '../OrderImpl';
import { Broker, OrderSide, OrderType, CashMarginType, IExecution } from '../types';
import { toExecution } from '../util';
import { createOrder } from './helper';

describe('Order', () => {
  test('averageFilledPrice', () => {
    const target = createOrder('Bitflyer', OrderSide.Buy, 0.01, 1000, CashMarginType.Cash, OrderType.Limit, 1);
    const ex1 = toExecution(target);
    ex1.price = 1100;
    ex1.size = 0.004;
    const ex2 = toExecution(target);
    ex2.price = 1200;
    ex2.size = 0.006;
    target.executions.push(ex1 as IExecution);
    target.executions.push(ex2 as IExecution);
    expect(target.averageFilledPrice).toBe(1160);
  });
});
