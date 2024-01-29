const petCreateMock = jest.fn();
const clientFindUniqueMock = jest.fn();

const createPetMock = {
    pet: {
        create: petCreateMock,
    },
    client: {
        findUnique: clientFindUniqueMock,
    },
};

export default createPetMock;
