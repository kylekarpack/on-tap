import ConnectorBase from "./connectorBase";

/**
 * The connector for Fremont Brewing
 */
export default class Fremont extends ConnectorBase {
  /**
   * Build the connector
   */
  constructor() {
    super();
    this.key = "fremont";
  }
}
