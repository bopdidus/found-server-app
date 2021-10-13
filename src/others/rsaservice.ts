import {Buffer} from 'buffer/';
import * as crypto from "crypto-browserify";

export class RsaService {
  private privateKey: string;
  private publicKey: string;
  private enabled: boolean;

  constructor() {
    this.privateKey = "Br1Ce0"
    this.publicKey = "T0to/15";
    this.enabled = true;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  public encrypt(plaintext) {
    if (!this.enabled)
      return plaintext;

    let buffer = new Buffer(plaintext);
    let encrypted = crypto.privateEncrypt(this.privateKey, buffer);

    return encrypted.toString('base64');
  }

  public decrypt(cypher: string): string {
    if (!this.enabled)
      return cypher;

    let buffer = Buffer.from(cypher, 'base64');
    let plaintext = crypto.publicDecrypt(this.publicKey, buffer);

    return plaintext.toString('utf8')
  }
}