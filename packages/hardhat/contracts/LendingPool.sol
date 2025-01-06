// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./RWAOracle.sol";

contract LendingPool {
    struct Loan {
        address borrower;
        address token;
        uint256 amount;
        uint256 collateral;
        bool isActive;
    }

    address public admin;
    RWAOracle public oracle;
    mapping(uint256 => Loan) public loans;
    uint256 public loanCounter;

    event LoanCreated(uint256 indexed loanId, address borrower, uint256 amount, uint256 collateral);
    event LoanRepaid(uint256 indexed loanId);
    event LoanLiquidated(uint256 indexed loanId);

    constructor(address _oracle) {
        admin = msg.sender;
        oracle = RWAOracle(_oracle);
    }

    function createLoan(address token, uint256 amount, uint256 collateral) external {
        require(oracle.getPrice(token) > 0, "Token not supported");

        uint256 collateralValue = collateral * oracle.getPrice(token);
        require(collateralValue >= amount, "Insufficient collateral");

        // Transfer collateral from borrower
        ERC20(token).transferFrom(msg.sender, address(this), collateral);

        // Record the loan
        loans[loanCounter] = Loan({
            borrower: msg.sender,
            token: token,
            amount: amount,
            collateral: collateral,
            isActive: true
        });

        emit LoanCreated(loanCounter, msg.sender, amount, collateral);
        loanCounter++;
    }

    function repayLoan(uint256 loanId) external {
        Loan storage loan = loans[loanId];
        require(loan.isActive, "Loan is not active");
        require(msg.sender == loan.borrower, "Only borrower can repay");

        // Transfer repayment amount to contract
        ERC20(loan.token).transferFrom(msg.sender, address(this), loan.amount);

        // Return collateral to borrower
        ERC20(loan.token).transfer(loan.borrower, loan.collateral);

        loan.isActive = false;
        emit LoanRepaid(loanId);
    }

    function liquidateLoan(uint256 loanId) external {
        Loan storage loan = loans[loanId];
        require(loan.isActive, "Loan is not active");

        uint256 collateralValue = loan.collateral * oracle.getPrice(loan.token);
        require(collateralValue < loan.amount, "Collateral value is sufficient");

        loan.isActive = false;
        emit LoanLiquidated(loanId);
    }
}
