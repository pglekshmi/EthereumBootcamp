//SPDX-License-Identifier:MIT

pragma solidity 0.8.34;

contract Cert {

    address admin;
    struct Certificate {
        uint256 cid;
        string cname;
        string course;
        string grade;
        string date;
    }

    constructor(){
        admin = msg.sender;
    }

    modifier onlyAdmin(){
        require(msg.sender == admin,"Unauthorized access");
        _;
    }

    mapping(uint256 => Certificate)public Certificates;

    event Issued(string course,uint256 cid, string grade);

    function issue(
        uint256 _cid,
        string memory _cname,
        string memory _course,
        string memory _grade,
        string memory _date
    ) public onlyAdmin() {

        Certificates[_cid] = Certificate(_cid, _cname, _course, _grade, _date);

        emit Issued(_course,_cid,_grade);

    }
}