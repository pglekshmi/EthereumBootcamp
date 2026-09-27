import { describe, it } from "node:test";
import { network } from "hardhat";
import { getCreateAddress } from "viem";
import assert from "node:assert/strict";

describe('CertVerification', async function () {

    const { viem, networkHelpers } = await network.connect();

    async function deployContract() {
        const [admin, other, any] = await viem.getWalletClients();
        const Cert = await viem.deployContract('Cert');
        return { admin, other, Cert };
    }

    it("should be deployed by admin", async function () {
        const { admin, other, Cert } = await networkHelpers.loadFixture(deployContract);
        console.log(Cert.address);

        const createdAddress = getCreateAddress({
            from: admin.account.address,
            nonce: 0n
        })

        assert.equal(Cert.address, createdAddress.toLowerCase())

    })

    it("Can enter and read certificate details", async function () {
        const { admin, other, Cert } = await networkHelpers.loadFixture(deployContract);

        await Cert.write.issue([123n, "Sumi", "CED", "A", "01/12/2025"]);

        const CertDetails = await Cert.read.Certificates([123n]);
        console.log(CertDetails);

        assert.equal(CertDetails[1], "Sumi");

        assert.equal(CertDetails[2], "CED")

    })

    it('Reverted with message', async function () {
        const { admin, other, Cert } = await networkHelpers.loadFixture(deployContract);

        const contractOther = await viem.getContractAt('Cert', Cert.address, {
            client: { wallet: other }
        })

        await viem.assertions.revertWith(contractOther.write.issue([101n, "Ami", "CED", "A", "01/02/2025"]),
                                                                         'Unauthorized access')
    })
})