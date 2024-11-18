export interface LogBufferRecord {
  /**
   * Method to execute.
   */
  methodRef: Function

  /**
   * Arguments to pass to the method.
   */
  arguments: unknown[]
}
