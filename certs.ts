/**
 * This script will generate self-signed certs using mkcert.  The self-signed certs are obviously not to be used in a
 * production setting, but for testing building docker locally, it helps in a pinch.
 */
import { execSync } from "child_process";
import { existsSync, mkdirSync } from "fs";

const { argv } = process;
const SubDomain = argv.indexOf("dev") !== -1 ? "dev" : "prod";
const ForceCreate = argv.indexOf("force") !== -1;
const CertsDir = "certs";
const AuthorityKey = `${CertsDir}/ca.key`;
const AuthorityCert = `${CertsDir}/ca.crt`;
const CertKey = `${CertsDir}/cert.key`;
const CertCrt = `${CertsDir}/cert.crt`;

if (ForceCreate) {
	execSync(`npx rimraf ${CertKey} ${CertCrt}`)
}

if (!existsSync(CertsDir)){
	mkdirSync(CertsDir);
}

// Create the authority key and cert
if (!existsSync(AuthorityKey)){
	execSync(`npx mkcert create-ca --key ${AuthorityKey} --cert ${AuthorityCert}`);
}

if (!existsSync(CertKey)){
	execSync(`npx mkcert create-cert --ca-key ${AuthorityKey} --ca-cert ${AuthorityCert} --key ${CertKey} --cert ${CertCrt} --domains ${SubDomain}.incutonez`);
}
