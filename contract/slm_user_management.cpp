/*RegAccount
owner (key)
companyid
isprovider
iscustomer
isconsult
isauditor
is3pvendor

RegRelation
owner (key)
account (key)
isprovider
iscustomer
isconsult
isauditor
is3pvendor*/

#include <eosio/eosio.hpp>

// Message table
struct [[eosio::table("slm_users"), eosio::contract("slm_user_management")]] slm_users {
    uint64_t    id       = {}; // Non-0
    eosio::name company     = {};
    bool isprovider = false;
    bool iscustomer  = false;
    bool isconsult = false;
    bool isauditor = false;
    bool is3pvendor = false;

    uint64_t primary_key() const { return id; }
};

//  using slm_users_table = eosio::multi_index<
//     "slm_users"_n, slm_users, eosio::indexed_by<"by.isprovider"_n>>;


// The contract
class slm_user_management : eosio::contract {
  public:
    // Use contract's constructor
    using contract::contract;

    // Post a new company
    [[eosio::action]] void post(uint64_t id, eosio::name company,  bool isprovider,  bool iscustomer, bool isconsult, bool isauditor, bool is3pvendor) {
        // slm_users_table table{get_self(), get_self()};

        typedef eosio::multi_index<"slm_users"_n, slm_users> slm_users_table;
        slm_users_table table;

        // Check user
        require_auth(company);

   
        // Create an ID if user didn't specify one
        eosio::check(id < 1'000'000'000ull, "user-specified company id is too big");
        if (!id)
            id = std::max(table.available_primary_key(), 1'000'000'000ull);

        // Record the message
        table.emplace(get_self(), [&](auto& slm_users) {
            slm_users.id       = id;
            slm_users.company    = company;
            slm_users.isprovider = isprovider;
            slm_users.iscustomer  = iscustomer;
            slm_users.isconsult = isconsult;
            slm_users.isauditor = isauditor;
            slm_users.is3pvendor = is3pvendor;
        });

        print("Createdd company: ", company);
    }
};


