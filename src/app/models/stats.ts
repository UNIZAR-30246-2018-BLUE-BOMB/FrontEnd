/**
 * URL shortener API
 * URL shortener
 *
 * OpenAPI spec version: 1.0.1-oas3
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */import { ClickStat } from './clickStat';


export interface Stats { 
    day: string;
    clickStat: Array<ClickStat>;
}